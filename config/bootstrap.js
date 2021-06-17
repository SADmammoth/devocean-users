/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  if ((await Role.count()) === 0) {
    await Role.createEach([
      {
        name: 'Admin',
        features: {
          workWithTasks: true,
          manageTasks: true,
          viewTasks: true,
          viewNotifications: true,
          manageNotifications: true,
          manageCollections: true,
          manageDocuments: true,
          viewDocuments: true,
          manageTeammates: true,
          viewTeammates: true,
        },
      },
      {
        name: 'User',
        features: {
          workWithTasks: true,
          manageTasks: true,
          viewTasks: true,
          viewNotifications: true,
          manageNotifications: true,
          manageCollections: true,
          manageDocuments: true,
          viewDocuments: true,
          manageTeammates: false,
          viewTeammates: true,
        },
      },
    ]);
  }

  if ((await Credentials.count()) === 0) {
    const creds = await Credentials.create({
      login: 'root',
      password: 'password',
    }).fetch();

    const admin = await Role.findOne({ name: 'Admin' });

    await User.create({
      credentials: creds.id,
      teammateId: '0',
      role: admin.id,
    });
  }
};
