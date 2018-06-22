import { Box } from '../../../lib/bakeryjs/Box';
import { Message } from '../../../lib/bakeryjs/Message';

class Tick extends Box<Message, Object> {
	private symbols: string[];
	meta = {
		requires: ['job'],
		provides: ['tick'],
	};

	constructor(name: string) {
		super(name);
		this.symbols = [];
    }

	public async process(input: Object): Promise<Object> {
		let i: number = 0;
		return new Promise((resolve) => {
			const id = setInterval(() => {
				if (i >= 3) {
					clearInterval(id);
					resolve({tick: i});
				}
				i += 1;
				this.q.push(new Message({raw: i}));
			}, 1000);
		});
	}
}

export default (name: string): Tick => {
	return new Tick(name);
};
