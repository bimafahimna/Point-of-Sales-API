const prisma = require('../config/database');

const createTransaction = async (req, res) => {
  const { buyerName, productImage, quantity, totalCost, status } = req.body;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        buyerName,
        productImage,
        quantity,
        totalCost,
        status,
      },
    });

    res.status(201).json({
      transactionCode: transaction.code,
      buyerName: transaction.buyerName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { status, sortBy, sortOrder } = req.query;

    let transactions;

    if (status) {
      transactions = await prisma.transaction.findMany({
        where: {
          status: status,
        },
        orderBy: {
          [sortBy]: sortOrder || 'asc',
        },
      });
    } else {
      transactions = await prisma.transaction.findMany({
        orderBy: {
          [sortBy]: sortOrder || 'asc',
        },
      });
    }

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getTransactionDetails = async (req, res) => {
  try {
    const { transactionCode } = req.params;
    const transaction = await prisma.transaction.findUnique({
      where: {
        code: transactionCode,
      },
    });

    if (!transaction) {
      res.status(404).send('Transaction not found');
      return;
    }

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { transactionCode } = req.params;
    const { buyerName, productImage, quantity, totalCost, status } = req.body;

    const updatedTransaction = await prisma.transaction.update({
      where: {
        code: transactionCode,
      },
      data: {
        buyerName,
        productImage,
        quantity,
        totalCost,
        status,
      },
    });

    res.json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update transaction' });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { transactionCode } = req.params;
    const deletedTransaction = await prisma.transaction.delete({
      where: {
        code: transactionCode,
      },
    });

    res.json(deletedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionDetails,
    updateTransaction,
    deleteTransaction,
  };