import React, { useState } from 'react';
import { Button } from 'antd';
import { UniButtonModel, Direction, AnyFC, clickedButtonStyleModel } from './type';

/**
 * direction:  "horizontal" | "vertical"
 * source: 数据
 * onClick: 点击查询按钮的回调数据
 * 
 * Example:
 *  <ButtonGroup
 *    onClick={(config => console.log(config))}
 *    source={[
 *      {label: 'Button1', key: 'Button1'},
 *      {label: 'Button2', key: 'Button2', antdButtonProps: { type: 'link' }},
 *    ]}
 *  />
 */

type ButtonGroupModel = {
  source: UniButtonModel[];
  onClick?: AnyFC;
  direction?: Direction;
  clickedButtonStyle?: clickedButtonStyleModel;
};

enum Flex_Direction {
  vertical = "column",
  horizontal = "row",
}

const ButtonGroup: React.FC<ButtonGroupModel> = props => {
  const { source, onClick, clickedButtonStyle, direction } = props;
  const [currentButtonKey, setCurrentButtonKey] = useState<any>();

  const getButtons = (source: UniButtonModel[], onClick: AnyFC) => {
    const buttonList = Array.isArray(source)
      ? source
          .map((itm: any) => {
            if (itm.key === currentButtonKey) {
              return { ...itm, antdButtonProps: { type: 'dashed' }, ...(clickedButtonStyle || {}) };
            }

            return { antdButtonProps: { type: 'primary' }, ...itm };
          })
          .map((config: UniButtonModel) => {
            const { antdButtonProps = {}, style, ...serviceConfig } = config;
            return (
              <Button
                style={{ marginBottom: 10, marginRight: 5, ...(style || {}) }}
                type="primary"
                {...antdButtonProps}
                onClick={() => {
                  setCurrentButtonKey(config.key);
                  onClick && onClick(serviceConfig);
                }}
                key={config.key}
              >
                {config.label}
              </Button>
            );
          })
      : [];

    return buttonList;
  };

  const layoutButton = (direction: Direction, onClick: AnyFC) => (source: UniButtonModel[]) => (
    <span style={{ display: 'inline-block' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', flexDirection: Flex_Direction[direction || 'horizontal'] }}>
        {getButtons(source, onClick)}
      </div>
    </span>
  );

  return <>{layoutButton(direction, onClick as AnyFC)(source)}</>;
};

export default ButtonGroup;
