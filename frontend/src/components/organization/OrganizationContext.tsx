import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../../apiClient';

interface Organization {
  id?: number;
  title: string;
  motto?: string;
  logo?: string;
  email?: string;
  website?: string;
  phone?: string;
  pobox?: string;
  street?: string;
  city?: string;
  country?: string;
}

interface OrganizationContextType {
  organization: Organization | null;
  loading: boolean;
  error: string | null;
  fetchOrganization: () => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextType | null>(null);

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganization = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get('/api/organizations/');
      if (response.data.length > 0) {
        setOrganization(response.data[0]);
      }
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          // Clear organization data and error on unauthorized
          setOrganization(null);
          setError(null);
          // Remove token as it might be expired
          localStorage.removeItem('access_token');
          delete axios.defaults.headers.common['Authorization'];
        } else {
          setError(`Failed to fetch organization data: ${err.response?.data?.detail || 'Unknown error'}`);
        }
      } else {
        setError('Failed to fetch organization data: Network error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  return (
    <OrganizationContext.Provider
      value={{
        organization,
        loading,
        error,
        fetchOrganization
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};