module.exports = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "Application passed healtcheck",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Application fail pass healtcheck",
      isSuccess: false,
    });
  }
};
