import { createFileRoute } from '@tanstack/react-router';
import { DocumentationPageBuilder } from '@/components/documentation/documentation-page-builder';
import { getPage, getAvailablePages } from '@/utils/documentation-loader';
import { createSEO } from '@/utils/create-seo';

export const Route = createFileRoute('/__documentation/docs/$page')({
  head: ({ params }: { params: { page: string } }) => {
    const { page } = params;
    const pageData = getPage(page);

    if (!pageData) {
      return {
        title: 'Page Not Found - DropFi Documentation',
        meta: [{ name: 'description', content: 'The requested documentation page could not be found.' }],
      };
    }

    const seoData = createSEO({
      title: `${pageData.title} - DropFi Documentation`,
      description: pageData.description || `Learn about ${pageData.title.toLowerCase()} in DropFi.`,
      canonical: `/docs/${page}`,
      ogImage: '/og-image.png',
      ogType: 'article',
    });

    return {
      meta: seoData.meta,
      links: seoData.links,
    };
  },
  component: DynamicDocumentationPage,
});

function DynamicDocumentationPage() {
  const { page } = Route.useParams();

  // Get the page data based on the route parameter
  const pageData = getPage(page);

  if (!pageData) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-medium text-red-500">Page Not Found</h1>
          <p className="text-lg text-muted-foreground">The documentation page "{page}" could not be found.</p>
          <p className="text-sm text-muted-foreground">Available pages: {getAvailablePages().join(', ')}</p>
        </div>
      </div>
    );
  }

  return <DocumentationPageBuilder page={pageData} />;
}
