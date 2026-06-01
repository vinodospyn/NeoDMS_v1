export type NavMode = "separate" | "shared"

// Use "separate" when with-header and with-sidebar have different routes/items.
// Switch to "shared" when both shells should render the same navigation list.
export const navMode: NavMode = "separate"
