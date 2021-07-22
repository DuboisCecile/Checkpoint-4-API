const db = require('../db');

const findSite = async (id) => {
  const idInt = parseInt(id, 10);
  const site = await db.site.findUnique({
    where: {
      id: idInt,
    },
  });
  return site;
};

const findSitesCategories = async () => {
  return db.siteCategory.findMany();
};

const findAllSites = async () => {
  return db.site.findMany();
  // return sites;
};

const createSite = async ({
  siteName,
  description,
  categoryId,
  address,
  postcode,
  city,
  country,
}) => {
  return db.site.create({
    data: {
      name: siteName,
      description,
      categoryId: parseInt(categoryId, 10),
      address,
      postcode,
      city,
      country,
    },
  });
};

module.exports = {
  findSite,
  findSitesCategories,
  findAllSites,
  createSite,
};
