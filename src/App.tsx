import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import "./App.css";

export default function CheckboxList() {
	const [checked, setChecked] = React.useState<number[]>([]);
	const [list, setList] = React.useState<{ sk: string; de: string }[]>([]);
	const [skWord, setSkWord] = React.useState("");
	const [deWord, setDeWord] = React.useState("");
	const [shownDetails, setShownDetails] = React.useState<Set<number>>(
		new Set()
	);

	// Toggle checkbox
	const handleToggle = (value: number) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	// Přidat slova do seznamu
	const handleAdd = () => {
		if (skWord.trim() && deWord.trim()) {
			setList((prev) => [...prev, { sk: skWord, de: deWord }]);
			setSkWord("");
			setDeWord("");
		}
	};

	// Vymazat seznam
	const handleClear = () => {
		setList([]);
		setChecked([]);
	};
	const handleDeleteItem = (index: number) => () => {
		const newList = list.filter((_, i) => i !== index);
		setList(newList);
		setChecked(checked.filter((item) => item !== index));
	};

	const handleCommentClick = (index: number) => {
		const newShownDetails = new Set(shownDetails);
		console.log(newShownDetails);
		if (newShownDetails.has(index)) {
			newShownDetails.delete(index); // Pokud je detail zobrazený, skryjeme ho
		} else {
			newShownDetails.add(index); // Pokud není zobrazený, zobrazíme ho
		}
		setShownDetails(newShownDetails);
	};

	return (
		<div className='container'>
			<div className='input-section'>
				<Box
					component='form'
					sx={{
						"& > :not(style)": { m: 1, width: "20ch" },
						display: "flex",
						flexDirection: "column",
					}}
					noValidate
					autoComplete='off'
				>
					<TextField
						id='outlined-sk'
						label='SK'
						variant='outlined'
						value={skWord}
						onChange={(e) => setSkWord(e.target.value)}
						className='input-field'
					/>
					<TextField
						id='outlined-de'
						label='DE'
						variant='outlined'
						value={deWord}
						onChange={(e) => setDeWord(e.target.value)}
						className='input-field'
					/>
				</Box>
				<div className='button-group'>
					<Button variant='contained' onClick={handleAdd}>
						Přidat
					</Button>
					<Button variant='outlined' color='error' onClick={handleClear}>
						Vymazat Vše
					</Button>
				</div>
			</div>
			<div className='list-section'>
				<List
					sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
				>
					{list.map((item, index) => {
						const labelId = `checkbox-list-label-${index}`;

						return (
							<ListItem key={index} disablePadding>
								<ListItemButton
									role={undefined}
									onClick={handleToggle(index)}
									dense
								>
									<ListItemIcon>
										<Checkbox
											edge='start'
											checked={checked.includes(index)}
											tabIndex={-1}
											disableRipple
											inputProps={{ "aria-labelledby": labelId }}
										/>
									</ListItemIcon>
									<ListItemText id={labelId} primary={item.sk} />
								</ListItemButton>
								<IconButton
									edge='end'
									onClick={() => handleCommentClick(index)}
								>
									<CommentIcon />
								</IconButton>
								<IconButton onClick={handleDeleteItem(index)}>
									<DeleteIcon />
								</IconButton>
								{shownDetails.has(index) && (
									<div style={{ marginLeft: "20px", color: "gray" }}>
										{item.de}
									</div>
								)}
							</ListItem>
						);
					})}
				</List>
			</div>
		</div>
	);
}
// toto kopirovat do terminalu: HOST=0.0.0.0 npm start

/*
Windows:

Otevři příkazový řádek (cmd) a zadej:
cmd
Zkopírovat kód
ipconfig
Najdi sekci Wireless LAN adapter (pro Wi-Fi) nebo Ethernet adapter (pro kabelové připojení) a podívej se na IPv4 Address.



Připojit se na localhost běžící na počítači z telefonu je možné, pokud jsou obě zařízení připojená ke stejné síti (například domácí Wi-Fi). Postup je následující:

1. Zjisti IP adresu svého počítače
Na počítači, kde běží server:

Linux (například Fedora):

Otevři terminál a spusť příkaz:
bash
Zkopírovat kód
ip a
Najdi IP adresu pro svou síť (např. 192.168.x.x nebo 10.x.x.x) pod rozhraním wlan0 (Wi-Fi) nebo eth0 (kabelové připojení).
Windows:

Otevři příkazový řádek (cmd) a zadej:
cmd
Zkopírovat kód
ipconfig
Najdi sekci Wireless LAN adapter (pro Wi-Fi) nebo Ethernet adapter (pro kabelové připojení) a podívej se na IPv4 Address.
2. Ujisti se, že server naslouchá na všech IP
Ve výchozím nastavení některé servery (např. React dev server) naslouchají pouze na localhost (127.0.0.1).
Aby byl přístupný z jiných zařízení, spusť server na všech IP adresách počítače:
Pokud používáš React (npm start), spusť:
bash
Zkopírovat kód
HOST=0.0.0.0 npm start
Nebo uprav package.json v sekci scripts:
json
Zkopírovat kód
"start": "HOST=0.0.0.0 react-scripts start"
3. Připoj se z telefonu
Na telefonu otevři prohlížeč.
Zadej do adresního řádku IP adresu počítače následovanou portem, např.:
arduino
Zkopírovat kód
http://192.168.1.10:3000 toto je jen vzor

*/
