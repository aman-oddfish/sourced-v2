import dbConnect from '@/lib/mongodb';
import Content from '@/lib/models/Content';

export async function hydrate() {
  try {
    await dbConnect();
    
    // Fetch all content sections from database
    const contentSections = await Content.find({}).lean();
    
    // Transform the data to match the expected format
    const content: Record<string, any[]> = {};
    
    contentSections.forEach(section => {
      content[section.section] = section.items;
    });
    
    if (Object.keys(content).length === 0) {
      const defaultContent = {
        hero: [
          {
            id: 'hero-title',
            title: 'Hero Title',
            type: 'text',
            value: 'Manage. Book. Create.',
            placeholder: 'Enter hero title'
          },
          // ... rest of your default content
        ],
        // ... other sections
        general: [
          {
            id: 'google-font',
            title: 'Google Font',
            type: 'text',
            value: 'Inter Tight',
            placeholder: 'Enter Google Font name'
          }
        ]
      };
      
      return defaultContent; // Return plain object, not NextResponse
    }
    
    return content; // Return plain object, not NextResponse
  } catch (error) {
    console.error('Error fetching content:', error);
    // Return fallback data instead of HTTP error response
    return {
      general: [
        {
          id: 'google-font',
          title: 'Google Font',
          type: 'text',
          value: 'Inter Tight',
          placeholder: 'Enter Google Font name'
        }
      ]
    };
  }
}