import { useState, useEffect } from 'react';

const DATA_URL = 'https://gist.githubusercontent.com/Karthick1242004/54bd54cc971a7472524e2a43b9ce5cb2/raw/56cb7545c84ed7d1f450f1d57b27b2e4e8d9a17c/data.json';

interface PortfolioData {
  personalInfo: {
    name: string;
    initial: string;
    email: string;
    designation: string;
    tagline: string;
    about: string;
    profileImage: string;
  };
  stats: {
    experience: string;
    clients: string;
    projects: string;
    developmentHours: string;
  };
  projects: Array<{
    title: string;
    year: string;
    image: string;
    description: string;
    category: string;
    visitLink: string;
  }>;
  skills: string[];
  careerHistory: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  social: {
    [key: string]: string;
  };
  footer: {
    copyright: string;
    creator: string;
    technology: string;
  };
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
