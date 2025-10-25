# Create frontend folders
New-Item -ItemType Directory -Path "frontend\components\layout" -Force
New-Item -ItemType Directory -Path "frontend\pages\scenario" -Force
New-Item -ItemType Directory -Path "frontend\pages\auth" -Force
New-Item -ItemType Directory -Path "frontend\styles" -Force
New-Item -ItemType Directory -Path "frontend\utils" -Force

# Create backend folders
$backendModules = @("auth", "users", "scenarios", "chat", "orders", "vitals", "logs", "llm", "notifications", "websocket")
foreach ($module in $backendModules) {
    New-Item -ItemType Directory -Path "backend\src\$module" -Force
    New-Item -ItemType File -Path "backend\src\$module\controller.ts" -Force
    New-Item -ItemType File -Path "backend\src\$module\service.ts" -Force
    New-Item -ItemType File -Path "backend\src\$module\module.ts" -Force
}

New-Item -ItemType Directory -Path "backend\config" -Force
New-Item -ItemType Directory -Path "backend\prisma" -Force
New-Item -ItemType File -Path "backend\config\config.ts" -Force
New-Item -ItemType File -Path "backend\prisma\schema.prisma" -Force

# Create frontend files
New-Item -ItemType File -Path "frontend\components\layout\Header.tsx" -Force
New-Item -ItemType File -Path "frontend\components\layout\Sidebar.tsx" -Force
New-Item -ItemType File -Path "frontend\components\layout\Footer.tsx" -Force
New-Item -ItemType File -Path "frontend\components\layout\Layout.tsx" -Force
New-Item -ItemType File -Path "frontend\pages\index.tsx" -Force
New-Item -ItemType File -Path "frontend\pages\scenario\[id].tsx" -Force
New-Item -ItemType File -Path "frontend\pages\auth\login.tsx" -Force
New-Item -ItemType File -Path "frontend\pages\auth\register.tsx" -Force
New-Item -ItemType File -Path "frontend\styles\globals.css" -Force
New-Item -ItemType File -Path "frontend\utils\auth.ts" -Force

Write-Host "✅ Project structure created successfully!"

cd frontend
npx create-next-app@latest . --typescript
npm install

cd ../backend
npm i -g @nestjs/cli
nest new . --package-manager npm

mkdir sharedTypes
cd sharedTypes
npm init -y
npm install typescript --save-dev
npx tsc --init