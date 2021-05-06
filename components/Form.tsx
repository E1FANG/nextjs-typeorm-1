import React, {ChangeEventHandler, FormEventHandler, ReactChild} from 'react';

type Props = {
  onSubmit: FormEventHandler;
  fields: {
    label: string,
    type: 'text' | 'password',//字符串类型？
    value: string | number,
    onChange: ChangeEventHandler<HTMLInputElement>,
    errors: string[]
  }[];
  buttons: ReactChild
}

export const Form: React.FC<Props> = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      {props.fields.map(field =>
        <div key={field.label}>
          <label>
            {field.label}
            <input type={field.type} value={field.value}
                   onChange={field.onChange}/>
            {field.errors?.length > 0 && <div>
              {field.errors.join(',')}
            </div>}
          </label>
        </div>
      )}
      <div>
        {props.buttons}
      </div>
    </form>
  );
};