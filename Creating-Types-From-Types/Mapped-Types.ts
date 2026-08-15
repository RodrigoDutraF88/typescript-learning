//Mapped Types

//Mapped type is a generic type which uses a union of PropertyKeys (usually via keypf) to iterate through keys to create a type
type OptionsFlags<Type> ={
    [Prooerty in keyof Type]: boolean;

};
//OptionsFlags will take all the properties from the type Type and change their values to be boolean

// You can remove or add these modifiers by prefixing with - or +. If you don’t add a prefix, then + is assumed

//Key remapping via as
