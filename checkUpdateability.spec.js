test("Check updateability of event logs)", async ({ userMngAPI }) => {
  // we trigger the date in the same time as the updateUser function
  const dateTimeString = new Date().toJSON();
  // we shorten the date string so we can use it to filter the logs
  const dateToMatch = dateTimeString.substring(0, 16);
  // we triger the updateUser function so that updateUser event would appear in event logs
  await userMngAPI.updateUser({});
  // we need to wait for the newest log to appear by using retry logic
  const assertWithRetry = async () => {
    const logs = await userMngAPI.getEventLogs({});

    let userDataFound = false;

    for (const userData of logs) {
      // search the log with the matched date updateUser event from before
      if (
        userData.timeGeneratedUtc.includes(dateToMatch) &&
        userData.eventType === "UpdateUser" &&
        userData.userId === generalData.user.playwrightTestUser
      ) {
        await expect(userData.timeGeneratedUtc).toContain(dateToMatch);
        userDataFound = true;
        break;
      }
    }

    // tell test to fail if userData is not found at all
    expect(userDataFound).toBe(true);
  };

  // retry logic
  await expect(async () => {
    await assertWithRetry();
  }).toPass({
    intervals: [6_000, 3_000, 3_000],
    timeout: 20_000,
  });
});
