/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/workspaces/new",
        destination: "/settings/workspace-management/workspaces/new",
        permanent: true,
      },
      {
        source: "/workspaces/:id/edit",
        destination: "/settings/workspace-management/workspaces/:id/edit",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
