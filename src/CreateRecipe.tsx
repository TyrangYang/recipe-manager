import './App.css';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input, TextArea } from './utils/Input';
type FormValues = {
  title: string;
  recipe?: string;
  ingredients: Ingredient[];
};

function CreateRecipe(): JSX.Element {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: '',
      recipe: '',
      ingredients: [],
    },
  });

  const {
    fields: ingFields,
    append: appendIng,
    remove: removeIng,
  } = useFieldArray({
    control,
    name: 'ingredients',
    keyName: 'fieldId',
  });

  const onSubmit = (data: FormValues) => {
    const recipe: Recipe = {
      id: Date.now().toString(),
      title: data.title.trim(),
      recipe: data.recipe?.trim() || undefined,
      ingredients: data.ingredients.filter((i) => i.name.trim()),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    alert('Created: ' + JSON.stringify(recipe, null, 2));
    reset();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Recipe (react-hook-form)</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ maxWidth: 700, width: '100%' }}
        >
          <div>
            <label>Title</label>
            <Input controller={{ control, name: 'title' }} placeholder={'a'} />
          </div>
          <div>
            <label>recipe</label>
            <TextArea control={control} name="recipe" />
          </div>

          <fieldset>
            <legend>Ingredients</legend>
            {ingFields.map((field, idx) => {
              console.log(field);
              return (
                <div
                  key={field.fieldId}
                  style={{ display: 'flex', gap: 8, marginBottom: 8 }}
                >
                  <Input
                    controller={{
                      control,
                      name: `ingredients.${idx}.name`,
                    }}
                    placeholder="name"
                  />
                  <Input
                    controller={{
                      control,
                      name: `ingredients.${idx}.amount`,
                    }}
                    asNumber
                    placeholder="amount"
                    type="number"
                    min={1}
                  />

                  <Input
                    controller={{
                      control,
                      name: `ingredients.${idx}.unit`,
                    }}
                    placeholder="unit"
                  />
                  <button type="button" onClick={() => removeIng(idx)}>
                    Remove
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              onClick={() =>
                appendIng({
                  name: '',
                  amount: 1,
                  unit: '',
                })
              }
            >
              Add Ingredient
            </button>
          </fieldset>

          <div style={{ marginTop: 12 }}>
            <button type="submit">Create</button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default CreateRecipe;
