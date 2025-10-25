#!/bin/bash

# Create root folders
mkdir -p frontend/components/layout
mkdir -p frontend/pages/scenario
mkdir -p frontend/pages/auth
mkdir -p frontend/styles
mkdir -p frontend/utils

mkdir -p backend/src/{auth,users,scenarios,chat,orders,vitals,logs,llm,notifications,websocket}
mkdir -p backend/config
mkdir -p backend/prisma

# Create frontend layout files
touch frontend/components/layout/{Header.tsx,Sidebar.tsx,Footer.tsx,Layout.tsx}
touch frontend/pages/{index.tsx}
touch frontend/pages/scenario/[id].tsx
touch frontend/pages/auth/{login.tsx,register.tsx}
touch frontend/styles/globals.css
touch frontend/utils/auth.ts
# Create backend module entry files
for module in auth users scenarios chat orders vitals logs llm notifications websocket; do
  touch backend/src/$module/{controller.ts,service.ts,module.ts}
done

# Create config and ORM files
touch backend/config/config.ts
touch backend/prisma/schema.prisma

echo "✅ Project structure created successfully!"
