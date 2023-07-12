module.exports = {
    // 1 Path to your story files
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    // 2 Path to your component files
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    // 3 Path to your webpack configuration
    framework: '@storybook/react',
    // 4 Path to your webpack configuration
    core: {
        builder: 'webpack5',
    },
};
