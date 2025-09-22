# ServerStatus-Rust 自定义主题

一个基于 Next.js 15 + React 19 的 ServerStatus-Rust 监控主题，使用 TypeScript、Tailwind CSS 和 Shadcn UI 构建。

## 功能特点

- 🚀 基于 Next.js 15 和 React 19 构建
- 💻 监控 CPU、内存、硬盘和流量使用情况
- 🎨 现代简洁的 UI 设计
- 📱 响应式布局，适配各种设备
- 🌓 深色/浅色模式支持
- ⚡ 高性能，快速加载
- 🔄 自动刷新数据
- 🧩 模块化组件设计

## 快速开始

### 环境要求

- Node.js 18.17.0 或更高版本
- Bun 1.0.0 或更高版本（推荐作为包管理器）

### 安装依赖

```bash
cd theme
bun install
```

### 开发模式

```bash
bun run dev
```

默认情况下，应用将在 http://localhost:3000 上运行。

### 构建生产版本

```bash
bun run build
```

### 启动生产版本

```bash
bun run start
```

## 环境变量配置

在项目根目录创建 `.env.local` 文件，配置后端地址：

```
# 指向 Komari 服务端根地址，例如：https://status.example.com
KOMARI_BASE_URL=https://your-komari-host
```

- 本主题内置了代理路由：`/api/servers`（聚合 `/api/nodes` 与 `/api/recent/{uuid}`）、`/api/public`、`/api/version`，均会转发至 `KOMARI_BASE_URL` 对应的 Komari 接口。
- 若未设置该变量，数据接口将不可用。

## 部署指南

### 独立部署（推荐）

1. 构建生产版本：

```bash
bun run build
```

2. 将生成的 `.next` 目录部署到您的 Web 服务器（Nginx、Vercel 等）

3. 配置 Nginx：

```nginx
server {
    listen 80;
    server_name status.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 替换内置主题

您也可以将构建后的文件复制到 ServerStatus-Rust 的 web 目录中：

```bash
# 备份原始文件
cp -r /path/to/serverstatus-rust/web /path/to/serverstatus-rust/web.bak

# 构建主题
bun run build
bun run export

# 复制到 web 目录
cp -r out/* /path/to/serverstatus-rust/web/

# 重启服务
systemctl restart stat_server  # 如果使用 systemd
# 或
docker-compose restart  # 如果使用 Docker
```

## 自定义主题

您可以根据需要修改主题，调整颜色、布局等：

- `src/lib/config.ts` - 全局配置
- `src/app/globals.css` - 全局样式
- `src/components/` - UI 组件

## 许可证

MIT



