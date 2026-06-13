const DEFAULT_SPEED_MULTIPLIER = 1;

const getSpeedMultiplier = (skin) => skin?.gameplay?.speedMultiplier ?? DEFAULT_SPEED_MULTIPLIER;

const getTickSpeed = (skin, baseSpeed = 35) => baseSpeed * getSpeedMultiplier(skin);

export { DEFAULT_SPEED_MULTIPLIER, getSpeedMultiplier, getTickSpeed };
