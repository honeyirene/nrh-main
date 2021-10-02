import React, { useMemo, useState } from 'react';
import { ClientGroup } from '../../shared';

interface Props {
	name: string
}

export const SampleComponent: React.FC<Props> = props => {
	const { name } = props;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	// for req
	const [a, setA] = useState<string>('sample');
	const [b, setB] = useState<number>(0);

	// for resp
	const [resp, setResp] = useState<object | null>(null);

	const client = useMemo(() => {
		const group = new ClientGroup();
		return group.sample;
	}, []);

	const handleA = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const v = evt.target.value;
		setA(v);
	}

	const handleB = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const v = evt.target.valueAsNumber;
		setB(v);
	}

	const request = async () => {
		try {
			setIsLoading(true);
			const resp = await client.sample({ a, b });
			setResp(resp);
		}
		catch (e) {
			setError(e as Error);
		}
		finally {
			setIsLoading(false);
		}
	};

	const onClick = async () => {
		await request();
	};

	if (isLoading) {
		return <h1>loading...</h1>;
	}
	if (error !== null) {
		return <h1> {JSON.stringify(error)} </h1>
	}

	return (
		<>
			<h1>{name} sample sender</h1>
			<input
				type="string"
				onChange={handleA}
			/>
			<input
				type="number"
				onChange={handleB}
			/>

			<button onClick={onClick}>
				send
			</button>

			{resp !== null
				? JSON.stringify(resp)
				: undefined
			}
		</>
	);
}
