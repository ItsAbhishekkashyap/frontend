import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function BlogPage() {
  const featuredPosts = [
    {
      title: "The Future of URL Shortening",
      excerpt: "Discover how AI is revolutionizing link management and what it means for marketers.",
      date: "May 15, 2023",
      readTime: "4 min read",
      category: "Technology",
      image: "/images/blog-tech.jpg"
    },
    {
      title: "Maximizing Clicks with Smart Links",
      excerpt: "Learn advanced strategies to optimize your shortened URLs for maximum engagement.",
      date: "April 28, 2023",
      readTime: "6 min read",
      category: "Marketing",
      image: "/images/blog-marketing.jpg"
    }
  ];

  const recentPosts = [
    {
      title: "Building a Scalable Link Shortener",
      excerpt: "Technical deep dive into our architecture decisions for handling millions of daily clicks.",
      date: "April 10, 2023",
      readTime: "8 min read",
      category: "Engineering"
    },
    {
      title: "Privacy-First Analytics",
      excerpt: "How we provide powerful insights while respecting user privacy.",
      date: "March 22, 2023",
      readTime: "5 min read",
      category: "Security"
    },
    {
      title: "Why Branded Links Matter",
      excerpt: "The psychology behind custom domains and how they affect click-through rates.",
      date: "March 15, 2023",
      readTime: "3 min read",
      category: "Branding"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">AshrtL Blog</h1>
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                Insights, stories and expertise about link management, digital marketing and web technology
              </p>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-4 h-4 bg-indigo-600 rounded-full mr-2"></span>
            Featured Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {featuredPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
                    {post.category} Image
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Posts */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-4 h-4 bg-indigo-600 rounded-full mr-2"></span>
            Latest Articles
          </h2>
          
          <div className="space-y-8">
            {recentPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="md:w-1/3 mt-4 md:mt-0 md:pl-6 flex items-center justify-center">
                    <div className="w-full h-32 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center text-gray-400">
                      Article Visual
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Never miss an update</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest articles, product updates and exclusive content.
            </p>
            <div className="max-w-md mx-auto flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-r-lg font-medium hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
