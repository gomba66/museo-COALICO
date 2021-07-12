import React, { useState, useEffect } from "react";
import UpdateFileModal from "./updateFileModal"


export function UpdateFiles({ name, year, link, region, description, category, subcategory, file, id }) {
  const [modal, setModal] = useState(false);
	const [posts, updatePosts] = useState([]);

	useEffect(() => {console.log(modal)}, [modal])

    return (
			<>
			<tr>
				<th scope="row">1</th>
				<td><i class="bi bi-pencil-square" onClick={() => setModal(!modal)}>
				</i></td>
				<td>{name}</td>
				<td>{year}</td>
				<td>{link}</td>
				<td>{region}</td>
				<td>{description}</td>
				<td>{category}</td>
				<td>{subcategory}</td>
				<td>{file}</td> 
			</tr>
				{modal ?
					<UpdateFileModal {...{name, year, link, region, description, category, subcategory, file, id}} /> :
					null
            } 
			</>
    )
}
