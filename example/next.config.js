const nextImplConfig = require('next-impl-config/with-next-impl-config').default;

/** @type {import('next').NextConfig} */
const nextConfig = {
    //
};

module.exports = nextImplConfig({ envs: ['development', 'staging', 'production'] })(nextConfig);
