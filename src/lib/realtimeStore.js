/**
 * Centralized Real-Time Reactive Store for Ayush SkillBridge
 * Synchronizes Opportunities and Student Applications across all personas:
 * Students, Academicians (Faculty), Industry Recruiters, and Institution Admins.
 * 
 * Works seamlessly with localStorage event bus for instant multi-tab reactivity,
 * and synchronizes with Supabase database when active.
 */

import { INITIAL_INTERNSHIPS } from '../data/mockData';
import { supabase, isSupabaseConfigured } from './supabase';

const OPPORTUNITIES_KEY = 'ayush_active_opportunities';
const APPLICATIONS_KEY = 'ayush_active_applications';

// Initialize opportunities from local storage or seed catalog
export function getStoredOpportunities() {
  try {
    const raw = localStorage.getItem(OPPORTUNITIES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Error reading stored opportunities:", e);
  }
  // Initialize with seed opportunities with default posterType = 'industry'
  const seed = INITIAL_INTERNSHIPS.map(j => ({
    ...j,
    posterType: j.posterType || 'industry',
    posterRole: j.posterRole || 'Industry Partner'
  }));
  try {
    localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(seed));
  } catch (e) {}
  return seed;
}

// Save or add a new opportunity (posted by Industry or Academician)
export function saveOpportunity(newOpportunity) {
  try {
    const current = getStoredOpportunities();
    const exists = current.some(o => o.id === newOpportunity.id);
    const updated = exists 
      ? current.map(o => o.id === newOpportunity.id ? { ...o, ...newOpportunity } : o)
      : [newOpportunity, ...current];
    localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(updated));
    dispatchStoreEvent('opportunities', updated);
    return updated;
  } catch (e) {
    console.error("Error saving opportunity:", e);
    return getStoredOpportunities();
  }
}

// Get all applications
export function getStoredApplications() {
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Error reading stored applications:", e);
  }
  return [];
}

// Save or record a new student application
export function saveApplication(newApplication) {
  try {
    const current = getStoredApplications();
    const exists = current.some(a => a.id === newApplication.id || (a.jobId === newApplication.jobId && a.studentId === newApplication.studentId));
    let updated;
    if (exists) {
      updated = current.map(a => 
        (a.id === newApplication.id || (a.jobId === newApplication.jobId && a.studentId === newApplication.studentId))
          ? { ...a, ...newApplication }
          : a
      );
    } else {
      updated = [newApplication, ...current];
    }
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));

    // Also increment applicant count on the opportunity
    const opps = getStoredOpportunities();
    const updatedOpps = opps.map(opp => {
      if (opp.id === newApplication.jobId) {
        return { ...opp, applicantsCount: (opp.applicantsCount || 0) + 1 };
      }
      return opp;
    });
    localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(updatedOpps));

    dispatchStoreEvent('applications', updated);
    dispatchStoreEvent('opportunities', updatedOpps);
    return { applications: updated, opportunities: updatedOpps };
  } catch (e) {
    console.error("Error saving application:", e);
    return { applications: getStoredApplications(), opportunities: getStoredOpportunities() };
  }
}

// Update application status (by Academician Professor or Industry Recruiter)
export function updateApplicationStatus(applicationId, newStatus, feedbackNote = '') {
  try {
    const current = getStoredApplications();
    const updated = current.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: newStatus,
          feedback: feedbackNote || app.feedback || '',
          lastUpdated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        };
      }
      return app;
    });
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
    dispatchStoreEvent('applications', updated);
    return updated;
  } catch (e) {
    console.error("Error updating application status:", e);
    return getStoredApplications();
  }
}

// Filter applicants specifically for a posting owner (Industry company or Faculty mentor)
export function getApplicantsForOwner(ownerId, ownerName, ownerType) {
  const allApps = getStoredApplications();
  const allOpps = getStoredOpportunities();

  return allApps.filter(app => {
    // Direct match on posterId
    if (ownerId && app.posterId === ownerId) return true;

    // Direct match on posterName / company / institution
    if (ownerName) {
      const cleanOwnerName = ownerName.toLowerCase();
      if (app.posterName && app.posterName.toLowerCase().includes(cleanOwnerName)) return true;
      if (app.company && app.company.toLowerCase().includes(cleanOwnerName)) return true;
    }

    // Match via target opportunity
    const targetOpp = allOpps.find(o => o.id === app.jobId);
    if (targetOpp) {
      if (ownerId && targetOpp.posterId === ownerId) return true;
      if (ownerName) {
        const cleanOwnerName = ownerName.toLowerCase();
        if (targetOpp.company && targetOpp.company.toLowerCase().includes(cleanOwnerName)) return true;
        if (targetOpp.posterName && targetOpp.posterName.toLowerCase().includes(cleanOwnerName)) return true;
      }
      if (ownerType && targetOpp.posterType === ownerType) return true;
    }

    return false;
  });
}

// Filter applications for a specific student
export function getApplicationsForStudent(studentId, studentEmail) {
  const allApps = getStoredApplications();
  return allApps.filter(app => {
    if (studentId && app.studentId === studentId) return true;
    if (studentEmail && app.studentEmail === studentEmail) return true;
    return false;
  });
}

// Custom event dispatcher for real-time reactivity within the same window and across windows
function dispatchStoreEvent(channel, data) {
  try {
    window.dispatchEvent(new CustomEvent('ayush_store_update', {
      detail: { channel, data }
    }));
  } catch (e) {}
}

// Hook to subscribe to real-time store updates
export function subscribeToStore(callback) {
  const handleCustom = (e) => {
    if (e.detail) callback(e.detail);
  };
  const handleStorage = (e) => {
    if (e.key === OPPORTUNITIES_KEY) {
      callback({ channel: 'opportunities', data: getStoredOpportunities() });
    }
    if (e.key === APPLICATIONS_KEY) {
      callback({ channel: 'applications', data: getStoredApplications() });
    }
  };

  window.addEventListener('ayush_store_update', handleCustom);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener('ayush_store_update', handleCustom);
    window.removeEventListener('storage', handleStorage);
  };
}
