module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'worksmartly',
    password: 'secret',
    database: 'testing_env',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migration/*.js'],
    cli: {
        migrationsDir: 'src/migrations',
    },
};
