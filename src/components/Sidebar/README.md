# Sidebar

Sidebar component matching the Figma design: [Untitled](https://www.figma.com/design/QxYuB00HI4LrfKMtISblxw/Untitled?node-id=0-1). Two states: **collapsed** (68px, icons only) and **expanded** (256px, labels, sections, venue name, chat input). Main content area shrinks when sidebar is expanded.

## Required assets (provide from Figma or design)

Do **not** assume; these must be supplied by the app:

| Asset | Description | Used as |
|-------|-------------|--------|
| **Logo** | Stylized “W” (or brand logo) | `logoSrc` |
| **Venue image** | Circular avatar (e.g. venue/restaurant) | `venueAvatarSrc` |

## Icons (from `src/icons/16`)

Each nav item expects a **16×16 icon** (React node), color `#FBFBFB`. ProductListPage uses these from `src/icons/16`:

| Sidebar item | Icon file |
|--------------|-----------|
| Home | `home-line.svg` |
| Search | `search-line.svg` |
| Inbox | `chat-default-line.svg` |
| Menu | `menu-edit-line.svg` |
| Orders | `order-bag-line.svg` |
| Money | `coin-bag-line.svg` |
| Analytics | `dashboard-line.svg` |
| Marketing | `promo-bullhorn-line.svg` |
| Settings | `settings-line.svg` |

## Bottom area

- **Collapsed:** Purple circular send button only.
- **Expanded:** Input with placeholder “Ask us anything” and plus/camera/mic icons + send button. Camera and microphone icons in the input are **not** implemented; add when you have assets.

## Usage

```tsx
<Sidebar
  expanded={sidebarExpanded}
  onExpandedChange={setSidebarExpanded}
  logoSrc={logoSrc}
  venueAvatarSrc={venueAvatarSrc}
  venueName="METRO Supermarkets"
  mainNavItems={[
    { id: 'home', label: 'Home', icon: <HomeIcon color="#FBFBFB" /> },
    { id: 'search', label: 'Search', icon: <SearchIcon color="#FBFBFB" /> },
    { id: 'inbox', label: 'Inbox', icon: <InboxIcon color="#FBFBFB" /> },
  ]}
  toolsNavItems={[
    { id: 'menu', label: 'Menu', icon: <MenuIcon color="#FBFBFB" /> },
    { id: 'orders', label: 'Orders', icon: <OrdersIcon color="#FBFBFB" /> },
    { id: 'money', label: 'Money', icon: <MoneyIcon color="#FBFBFB" /> },
    { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon color="#FBFBFB" />, active: true },
    { id: 'marketing', label: 'Marketing', icon: <MarketingIcon color="#FBFBFB" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon color="#FBFBFB" /> },
  ]}
  chatInputPlaceholder="Ask us anything"
  onSendClick={() => {}}
/>
```

Ensure the main layout uses flex so the content area has `flex: 1` and shrinks when the sidebar width increases.
