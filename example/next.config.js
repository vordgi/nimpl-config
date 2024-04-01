const { default: nextImplConfig } = require('@nimpl/config/with-next-impl-config');

/** @type {import('next').NextConfig} */
const nextConfig = {
    //
};

module.exports = nextImplConfig({ envs: ['development', 'staging', 'production'] })(nextConfig);
