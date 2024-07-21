import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  changeIngredientLayer,
  removeIngredientFromOrder
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveUp = () => {
      dispatch(changeIngredientLayer({ fromIndex: index, toIndex: index - 1 }));
    };
    const handleMoveDown = () => {
      dispatch(changeIngredientLayer({ fromIndex: index, toIndex: index + 1 }));
    };
    const handleRemove = () => {
      dispatch(removeIngredientFromOrder(ingredient.id));
    };
    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleRemove}
      />
    );
  }
);
