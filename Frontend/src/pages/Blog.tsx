import React from 'react';

// Import images
import postImage1 from '../assets/blog/aerial-view-container-cargo-ship-sea_335224-719.jpg';
import postImage2 from '../assets/blog/airplane-track-front-view-generative-ai_188544-7895.jpg';
import postImage3 from '../assets/blog/dynamic-scene-cargo-plane-operation_980928-73445.jpg';
import postImage4 from '../assets/blog/images (2).jpeg';
import postImage5 from '../assets/blog/many-transport-trucks-parked-service-station-sunset-ai-generative_123827-23416.jpg';
import postImage6 from '../assets/blog/interior-large-distribution-warehouse-with-shelves-stacked-with-palettes-goods-ready-market_342744-1481.jpg';
import postImage7 from '../assets/blog/logistics-means-transport-together-with-technological-futuristic-holograms_23-2151662911.jpg';
import postImage8 from '../assets/blog/aerial-view-container-cargo-ship-sea_335224-720.jpg';
import newsletterImage from '../assets/empty-business-entrepreneur-office-setup-home-with-personal-computer_482257-91126.jpg'; // Newsletter image

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Freight Transport",
    image: postImage1,
    excerpt: "Exploring the advancements in technology that are shaping the future of freight transport.",
    link: "#",
  },
  {
    id: 2,
    title: "5 Tips for Logistics Management",
    image: postImage2,
    excerpt: "Learn how to optimize your logistics management for better efficiency and cost savings.",
    link: "#",
  },
  {
    id: 3,
    title: "Sustainable Practices in Freight Shipping",
    image: postImage3,
    excerpt: "Understanding the importance of sustainability in the freight industry and how to implement it.",
    link: "#",
  },
  {
    id: 4,
    title: "The Impact of AI on Logistics",
    image: postImage4,
    excerpt: "How artificial intelligence is transforming the logistics sector and enhancing operational efficiency.",
    link: "#",
  },
  {
    id: 5,
    title: "Blockchain in Freight: A Game Changer",
    image: postImage5,
    excerpt: "Examining the potential of blockchain technology to revolutionize freight and shipping.",
    link: "#",
  },
  {
    id: 6,
    title: "Maximizing Supply Chain Visibility",
    image: postImage6,
    excerpt: "Strategies for improving visibility across the supply chain for better decision-making.",
    link: "#",
  },
  {
    id: 7,
    title: "Reducing Freight Costs: Best Practices",
    image: postImage7,
    excerpt: "Top strategies for businesses to reduce their freight costs while maintaining service quality.",
    link: "#",
  },
  {
    id: 8,
    title: "The Role of E-commerce in Freight",
    image: postImage8,
    excerpt: "How the rise of e-commerce is reshaping the logistics and freight landscape.",
    link: "#",
  },
];

const Blog: React.FC = () => {
  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={headerTitleStyle}>Blog</h1>
        <p style={headerSubtitleStyle}>Latest insights and updates from the world of freight.</p>
      </header>

      <div style={contentStyle}>
        <div style={postsContainerStyle}>
          {blogPosts.map((post) => (
            <div key={post.id} style={postStyle}>
              <img src={post.image} alt={post.title} style={postImageStyle} />
              <h2 style={postTitleStyle}>{post.title}</h2>
              <p style={postExcerptStyle}>{post.excerpt}</p>
              <a href={post.link} style={readMoreStyle}>Read More</a>
            </div>
          ))}
        </div>

        <aside style={sidebarStyle}>
          <h2 style={sidebarTitleStyle}>About Us</h2>
          <p style={sidebarTextStyle}>Freight iT is dedicated to revolutionizing the logistics and freight industry through technology and innovation.</p>
          <h2 style={sidebarTitleStyle}>Categories</h2>
          <ul style={sidebarListStyle}>
            <li style={sidebarListItemStyle}><a href="#" style={sidebarLinkStyle}>Logistics</a></li>
            <li style={sidebarListItemStyle}><a href="#" style={sidebarLinkStyle}>Freight</a></li>
            <li style={sidebarListItemStyle}><a href="#" style={sidebarLinkStyle}>Transport</a></li>
          </ul>
        </aside>
      </div>

      {/* Newsletter Section */}
      <div style={newsletterContainerStyle}>
        <div style={newsletterImageContainerStyle}>
          <img src={newsletterImage} alt="Newsletter" style={newsletterImageStyle} />
        </div>
        <div style={newsletterContentStyle}>
          <h2 style={newsletterTitleStyle}>Subscribe to Our Newsletter</h2>
          <p style={newsletterTextStyle}>Stay updated with the latest news and insights in the freight and logistics industry.</p>
          <form style={newsletterFormStyle}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={newsletterInputStyle} 
              required 
            />
            <button type="submit" style={newsletterButtonStyle}>Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles
const pageStyle: React.CSSProperties = {
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
  fontFamily: 'Poppins, sans-serif', 
};

const headerStyle: React.CSSProperties = {
  textAlign: 'left',
  marginBottom: '2rem',
};

const headerTitleStyle: React.CSSProperties = {
  fontSize: '36px',
  margin: '0',
};

const headerSubtitleStyle: React.CSSProperties = {
  fontSize: '18px',
  color: '#666',
};

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
};

const postsContainerStyle: React.CSSProperties = {
  flex: '3',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
};

const postStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  border: '1px solid #888', 
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)', 
  padding: '1rem',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
};

const postImageStyle: React.CSSProperties = {
  width: '100%',
  height: '200px', 
  objectFit: 'cover', 
  borderRadius: '8px',
};

const postTitleStyle: React.CSSProperties = {
  fontSize: '20px',
  margin: '1rem 0',
};

const postExcerptStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#555',
};

const readMoreStyle: React.CSSProperties = {
  color: '#e79f31',
  textDecoration: 'none',
  fontWeight: 'bold',
  alignSelf: 'flex-start', 
};

const sidebarStyle: React.CSSProperties = {
  flex: '1',
  padding: '1rem',
  backgroundColor: '#f7f7f7',
  borderRadius: '8px',
  marginLeft: '20px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const sidebarTitleStyle: React.CSSProperties = {
  fontSize: '20px',
  margin: '0 0 1rem 0',
};

const sidebarTextStyle: React.CSSProperties = {
  fontSize: '14px',
  marginBottom: '1rem',
};

const sidebarListStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: '0',
};

const sidebarListItemStyle: React.CSSProperties = {
  marginBottom: '0.5rem',
};

const sidebarLinkStyle: React.CSSProperties = {
  color: '#000042',
  textDecoration: 'none',
};

// Newsletter Styles
const newsletterContainerStyle: React.CSSProperties = {
  marginTop: '4rem',
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
  justifyContent: 'center',
};

const newsletterImageContainerStyle: React.CSSProperties = {
  flex: '1',
};

const newsletterImageStyle: React.CSSProperties = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '16px',
};

const newsletterContentStyle: React.CSSProperties = {
  flex: '2',
  textAlign: 'center',
};

const newsletterTitleStyle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 1.5rem 0',
  color: '#333',
};

const newsletterTextStyle: React.CSSProperties = {
  fontSize: '18px',
  marginBottom: '2rem',
  color: '#444',
};

const newsletterFormStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
};

const newsletterInputStyle: React.CSSProperties = {
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #bbb',
  width: '70%', 
  fontSize: '16px',
};

const newsletterButtonStyle: React.CSSProperties = {
  padding: '1rem 2rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#000042',
  color: '#fff',
  cursor: 'pointer',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
};

export default Blog;