import User from "../models/User.js";

const createRewardForUser = async (req, res) => {
  const {
    email,
    name,
    isPercentage,
    value,
    durationInMonths,
    usageLimit,
    terms = [],
    minimumPrice = 0,
  } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    let valueStr = "";
    if (isPercentage) {
      valueStr = value + "%";
    }

    const expiresAt = new Date(
      Date.now() + durationInMonths * 30 * 24 * 60 * 60 * 1000
    );

    const newReward = {
      name,
      value: valueStr,
      terms,
      durationInMonths,
      usageLimit,
      minimumPrice,
      expiresAt,
    };

    user.rewards.push(newReward);
    await user.save();

    res.status(201).json({ message: "Reward created", rewards: user.rewards });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRewards = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email }, { rewards: 1 });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    const rewards = user.rewards;
    return res.status(200).json(rewards);
  } catch (error) {}
};

export { createRewardForUser, getRewards };
