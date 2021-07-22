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
  return db.site.findMany({
    include: {
      Category: true,
    },
  });
};

const createSite = async ({
  siteName,
  description,
  categoryId,
  address,
  postcode,
  city,
  country,
  image,
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
      image,
    },
  });
};

const findUnique = (id) =>
  db.site.findUnique({
    where: { id: parseInt(id, 10) },
    include: { Category: true },
  });

const findByQuery = (searchValue) =>
  db.site.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchValue,
          },
        },
        {
          description: {
            contains: searchValue,
          },
        },
      ],
    },
  });

module.exports = {
  findSite,
  findSitesCategories,
  findAllSites,
  createSite,
  findByQuery,
  findUnique,
};
