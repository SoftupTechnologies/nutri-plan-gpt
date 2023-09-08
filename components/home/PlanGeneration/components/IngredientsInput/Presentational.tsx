import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Tooltip from '@/components/shared/tooltip';
import commonIngredients from '../../constants/commonIngredients';
import commonAllergicIngredients from '../../constants/commonAllergicIngredients';
import getInputBorderClasses from '../../helpers/getInputBorderClasses';
import { InfoIcon } from '@/components/shared/icons';
import { IngredientType } from '@/lib/types';
import cn from "classnames";

interface Props {
  shouldValidate?: boolean;
  updateIngredients: (newIngredients: string[]) => void;
  ingredientType: IngredientType;
}

const IngredientsInput: React.FC<Props> = ({
  shouldValidate = false,
  updateIngredients,
  ingredientType,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const ingredients = ingredientType === "common" ? commonIngredients : commonAllergicIngredients;
  const isInputRequired = ingredientType === "common";
  const isAllergicIngredients = ingredientType === "allergic";
  

  const defaultSuggestion = useMemo(() => {
    if(isAllergicIngredients) {
      return ['Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Fish', 'Shellfish', 'Wheat', 'Soy']
    }
    else {
      return ['Chicken', 'Beef', 'Eggs', 'Milk', 'Yogurt', 'Avocado', 'Bread', 'Tomato', 'Salad', 'Berries'];

    }
  }, [isAllergicIngredients]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const addNewIngredient = (newIngredient?: string) => {
    if (!newIngredient) {
      return;
    }

    const ingredientExists = selectedIngredients.includes(newIngredient);
    const newSelectedIngredients = [...selectedIngredients];

    if (!ingredientExists) {
      newSelectedIngredients.push(newIngredient);
    }

    setSelectedIngredients(newSelectedIngredients);
    updateIngredients(newSelectedIngredients);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addNewIngredient(inputValue.trim());
    }
  };

  const handleIngredientClick = (clickedIngredient: string) => {
    const newSelectedIngredients = selectedIngredients.filter(
      (ingredient) => ingredient !== clickedIngredient,
    );

    setSelectedIngredients(newSelectedIngredients);
    updateIngredients(newSelectedIngredients);
  };

  useEffect(() => {
    if (inputValue) {
      const uniqueIngredients = Array.from(new Set(ingredients));
      setFilteredSuggestions([
        ...uniqueIngredients.filter((suggestion) => (
          suggestion.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
        )),
        inputValue,
      ]);
    } else {
      setFilteredSuggestions(defaultSuggestion);
    }
  }, [defaultSuggestion, inputValue, ingredients]);


  const allergiesTooltipContent = "Optional: Add some ingredients that you may be allergic to!";
  const commonIngredientsTooltipContent = "Add at least 6 base ingredients for meals";
  const inputPlaceholder = isAllergicIngredients ? " e.g. peanuts, wheat, gluten" : " e.g. chicken, broccoli, rice";

  return (
    <div className="flex flex-col">
      <div className='flex'>
        <label
          className={cn("mb-2 block flex items-center after:text-red-500", isInputRequired ?
           "after:content-['*']" : 
           "after:content-['']")}
          htmlFor="ingredients"
        >
          {isAllergicIngredients ? "List of allergic ingredients (optional):" :  "List of Ingredients:"}
        </label>
   
          <Tooltip content={!isAllergicIngredients ? "Add at least 6 base ingredients for meals" : "Add any ingredient you are allergic to (optional)"}>
            <h1><InfoIcon className="h-[25px] w-[25px] pl-1" /></h1>
          </Tooltip>
  
      </div>
      <div className="flex flex-wrap">
        {selectedIngredients.map((ingredient) => (
          <div
            key={ingredient}
            className="select-none bg-green-400 text-white rounded-full px-3 py-1 mr-2 mb-2 cursor-pointer"
            onClick={() => handleIngredientClick(ingredient)}
          >
            {ingredient}
          </div>
        ))}
      </div>
      <input
        id="ingredients"
        name="ingredients"
        ref={inputRef}
        type="text"
        className={`${getInputBorderClasses(
          selectedIngredients.toString(),
          'ingredients',
          shouldValidate
        )} block w-full resize-none rounded-md focus:ring-opacity-50`}
        value={inputValue}
        placeholder={inputPlaceholder}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {filteredSuggestions.length > 0 && (
        <div className="flex flex-wrap mt-2">
          {filteredSuggestions.map((suggestedIngredient) => (
            <div
              key={suggestedIngredient}
              className="select-none bg-gray-200 text-gray-700 rounded-full px-3 py-1 mr-2 mb-2 cursor-pointer opacity-50 hover:opacity-100"
              onClick={() => addNewIngredient(suggestedIngredient)}
              style={{ opacity: selectedIngredients.includes(suggestedIngredient) ? 0.5 : 1 }}
            >
              {suggestedIngredient}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientsInput;
