import { Schema, model, models } from 'mongoose';

const example_schema = new Schema({
    guild: String,
    example_schema: Boolean,
});

const example_schema_ = models.example_schema || model('example_schema', example_schema);

export default example_schema_;