function advanceChain(prevChainCount) {
  return prevChainCount + 1;
}

function resetChainIfNoClear(prevChainCount, lapHadClear) {
  return lapHadClear ? prevChainCount : 0;
}

export { advanceChain, resetChainIfNoClear };
