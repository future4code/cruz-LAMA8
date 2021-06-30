import {app} from "./controller/app";
import { userRouter } from './routes/userRouter';
import { bandRouter } from './routes/bandRouter';
import { showRouter } from './routes/showRouter';

app.use('/show', showRouter);

app.use('/user', userRouter);

app.use('/band', bandRouter);

