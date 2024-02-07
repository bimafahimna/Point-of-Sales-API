const prisma = require("../config/database");

const getEmployees = async (req, res, next) => {
  try {
    const { page, limit } = req.query; // custom query for pagination when the inventories are too many (e.g. /api/inventories?page=2&limit=10)
    const pageNumber = parseInt(page) || 1; // default page number is 1
    const pageSize = limit ? parseInt(limit) : Infinity; // default page size is Infinity (all inventories)
    const skip = (pageNumber - 1) * (isFinite(pageSize) ? pageSize : 0); // skip is the number of inventories to skip (e.g. page 2 should skip the first 10 inventories)
    const take = isFinite(pageSize) ? pageSize : undefined;

    const employees = await prisma.employee.findMany({
      skip,
      take,
    });
    res.status(200).json({ data: employees });
  } catch (error) {
    next(error);
  }
};

const getEmployeeByUsername = async (req, res, next) => {
  const { username } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { username },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ data: employee });
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  const { username } = req.params;
  const { name, image, address, date_of_birth, handphone } = req.body;

  try {
    const employee = await prisma.employee.update({
      where: { username },
      data: {
        name,
        image,
        address,
        date_of_birth,
        handphone,
      },
    });

    res.status(200).json({ data: employee });
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  const { username } = req.params;

  try {
    const employee = await prisma.employee.delete({
      where: { username },
    });

    res.status(200).json({ data: employee });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployeeByUsername,
  updateEmployee,
  deleteEmployee,
};
