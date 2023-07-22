module.exports = {
    // 1 Path to your story files
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    // 2 Path to your component files
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials', // аддон добавляющий много других аддонов
            options: {
                backgrounds: false, // выключаем у него background, чтобы
            }, // другой аддон (storybook-addon-themes) смог работать
        },
        '@storybook/addon-interactions',
        'storybook-addon-mock/register', // аддон для мока запросов
        'storybook-addon-themes', // аддон для добавления тем
    ],
    // 3 Path to your webpack configuration
    framework: '@storybook/react',
    // 4 Path to your webpack configuration
    core: {
        builder: 'webpack5',
    },
};
