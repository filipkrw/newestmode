setup:
    cd client && bun install
    cd server && bun install

dev:
    just client-dev &
    just server-dev

client-dev:
    cd client && bun dev

server-dev:
    cd server && bun dev
