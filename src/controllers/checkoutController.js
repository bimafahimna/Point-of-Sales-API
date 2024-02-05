const prisma = require('../config/database');

const getCheckOut = async (req, res) => {
    let {transaction_id} = req.params
    
    try {
      const summary = await prisma.transaction.findUnique({
        where:{transaction_id:parseInt(transaction_id)},
        select:{
            productlist_id:true,
            total_amount:true,
            discount:true,
            payment_method_id:true,
            employee_id:true,
            date_time:true
        }
      });


      res.status(200).json(summary);
    } catch (error) {
      res.status(error.code).json(error.message);
    }
};



module.exports={
    getCheckOut
}

