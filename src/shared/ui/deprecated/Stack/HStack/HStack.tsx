import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * @deprecated устарел, используем новые компоненты из папки redesign
 */
export const HStack = (props: HStackProps) => {
    return <Flex direction="row" {...props} />;
};
