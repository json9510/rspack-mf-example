# React Module Federation Example

This is a monorepo example of Module Federation using React, Rspack, and Bun. It consists of a host application that consumes a remote login application.

## Project Structure

- `host-app/` - Main application that consumes the login module
- `login-app/` - Remote application that exposes the login functionality

## Prerequisites

- [Bun](https://bun.sh) v1.2.4 or higher
- Node.js 16+

## Getting Started

1. Install dependencies in both applications:

```bash
# Root directory
bun install

# Host app
cd host-app
bun install

# Login app
cd login-app
bun install
```
