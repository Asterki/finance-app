import type { Express } from 'express';

// Import the routers
import AccountsRouter from './accounts';
import ProfileRouter from "./profile"

class Router {
  private instance: Router | null = null;

  constructor() {}

  getInstance() {
    if (!this.instance) this.instance = new Router();
    return this.instance;
  }

  public registerRoutes = (server: Express) => {
    server.use('/api/accounts', AccountsRouter);
    server.use('/api/profile', ProfileRouter);
  };
}

export default Router;
