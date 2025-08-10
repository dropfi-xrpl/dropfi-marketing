import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface DocumentationContextType {
  tableOfContents: TableOfContentsItem[];
  setTableOfContents: (items: TableOfContentsItem[]) => void;
}

const DocumentationContext = createContext<DocumentationContextType | undefined>(undefined);

export function DocumentationProvider({ children }: { children: ReactNode }) {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  return <DocumentationContext.Provider value={{ tableOfContents, setTableOfContents }}>{children}</DocumentationContext.Provider>;
}

export function useDocumentation() {
  const context = useContext(DocumentationContext);
  if (context === undefined) {
    throw new Error('useDocumentation must be used within a DocumentationProvider');
  }
  return context;
}
