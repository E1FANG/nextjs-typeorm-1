import React, { ReactChild, useCallback, useState} from 'react';
import {AxiosResponse} from 'axios';

type Field<T> = {
  label: string,
  type: 'text' | 'password' | 'textarea',//字符串类型？
  // value: string | number,
  key: keyof T
}

type useFormOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  buttons: ReactChild;
  submit: {
    request:(formData:T) => Promise<AxiosResponse<T>>,
    message:string
  }
}

//泛型：T 它是一个占位符，占的是initFormData的类型的位 （所以initFormData的类型是根据外面传入的T来改变的）
export function useForm<T>(options:useFormOptions<T>) {
  const {initFormData,fields,buttons,submit} = options
  // 非受控组件
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    const e: { [k in keyof T]?: string[] } = {};
    //e是一个对象，k肯定是T的所有值
    // ?: 是因为 k一开始是没有的， 当遍历之后 执行e[key]=[] 才会有
    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) {
        e[key] = [];
      }
    }
    //e作为errors的初始值
    return e;
  });
  const onChange = useCallback((key: keyof T, value: any) => {
    setFormData({...formData, [key]: value});
  }, [formData]);
  const _onSubmit = useCallback((e) => {
    e.preventDefault();
    submit.request(formData).then(() => {
        window.alert(submit.message);
      }, (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            setErrors(response.data);
          }
        }
      }
    );

  }, [submit, formData]);
  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map(field =>
        <div key={field.label}>
          <label>
            {field.label}
            {
              field.type === 'textarea' ?
                <textarea onChange={e => onChange(field.key, e.target.value)}
                          value={formData[field.key].toString()} />
                :
                <input type={field.type} value={formData[field.key].toString()}
                         onChange={e => onChange(field.key, e.target.value)}/>
            }

            {errors[field.key]?.length > 0 && <div>
              {errors[field.key].join(',')}
            </div>}
          </label>
        </div>
      )}
      <div>
        {buttons}
      </div>
    </form>
  );
  return {
    form,setErrors
  };
}
