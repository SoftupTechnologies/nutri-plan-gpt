import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import commonIngredients from '../../constants/commonIngredients';
import getInputBorderClasses from '../../helpers/getInputBorderClasses';

interface Props {
  shouldValidate?: boolean;
  updateIngredients: (newIngredients: string[]) => void;
}

const IngredientsInput: React.FC<Props> = ({
  shouldValidate = false,
  updateIngredients,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);


  const defaultSuggestion = useMemo(() => {
    return ['Chicken', 'Beef', 'Eggs', 'Milk', 'Yogurt', 'Avocado', 'Bread', 'Tomato', 'Salad', 'Berries'];
  }, []);

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
      const uniqueCommonIngredients = Array.from(new Set(commonIngredients));
      setFilteredSuggestions([
        ...uniqueCommonIngredients.filter((suggestion) => (
          suggestion.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
        )),
        inputValue,
      ]);
    } else {
      setFilteredSuggestions(defaultSuggestion);
    }
  }, [defaultSuggestion, inputValue]);

  return (
    <div className="flex flex-col">
      <label className="after:text-red-500 after:content-['*'] mb-2 block" htmlFor="ingredients">
        List of Ingredients:
      </label>
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
        placeholder="e.g. chicken, broccoli, rice"
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
