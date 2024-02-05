const prisma = require('../config/database');

const createDiscount = async (req, res) => {
    let { name, percentage, description, discount_code } = req.body;
  
    try {
      const discount = await prisma.discount.create({
        data:{
            name,
            description,
            percentage,
            discount_code
        }
      });
      res.status(201).json({discount,info:"Discount Voucher successfully created"});
    } catch (error) {
      next(error);
    }
};

const getDiscounts = async (req, res) => {
  try {
    // Prisma built-in pagination

    const discounts = await prisma.discount.findMany();

    res.status(200).json(discounts);
  } catch (error) {
    next(error);
  }
};

const updateDiscount = async (req,res) => {
    let {discount_id} = req.params;

    let {name,description,percentage,discount_code} = req.body;

    try {
        const discount = await prisma.inventory.update({
            where: { discount_id: parseInt(discount_id) },
            data:{
                name,
                description,
                percentage,
                discount_code
            }
        });

        res.status(200).json({discount,info:"Discount Voucher successfully updated"});
    } catch (error) {
        next(error);
    }

};

const deleteDiscount = async (req,res) => {
    let {discount_id} = req.params;

    try {
        const discount = await prisma.discount.delete({
            where: { discount_id: parseInt(discount_id) },
    });

        res.status(200).json({discount,info:"Discount Voucher successfully deleted"});
    } catch (error) {
        next(error);
    }

};

module.exports={
    createDiscount,
    getDiscounts,
    updateDiscount,
    deleteDiscount
}

