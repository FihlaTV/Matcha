/* eslint-disable */
import user from '../server/http/services/user';
import { Router } from 'express';
import R from 'ramda';

const router = Router();

const init = (req, res) => {
  const routes = [];

  const finalRoutes = [];
  routes.push(user);
  routes.forEach(route => {
    R.map((verb) => {
      const nameSplit = R.split('$', verb.name);
      const url = nameSplit[1] ? `/${route.name}/:${nameSplit[1]}` : `/${route.name}`;
      const routeDetails = {
          verb,
          verbName: nameSplit[0],
          url,
          name: route.name,
          before: route.before[nameSplit[0]],
      };
      finalRoutes.push(routeDetails);
    }, route.service);
  });
  finalRoutes.forEach(route => {
    let { verbName, url, before, verb} = route;
    const hooks = before ? Object.values(before) : [];
    hooks.push(verb);
    router[verbName](route.url, hooks);

  });
  return router;
};

export default init();