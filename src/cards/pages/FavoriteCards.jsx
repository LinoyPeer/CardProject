import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";
import { useCurrentUser } from "../../users/providers/UserProvider";
import CardsFeedback from "../components/CardsFeedback";

export default function FavoriteCards() {
  const { cards, getAllCards, isLoading, error, handleDelete, handleLike } = useCards();
  const { user } = useCurrentUser();
  const [favCards, setFavCards] = useState([]);

  const likedCardsOfCurrentUser = cards.filter(card => card.likes.includes(user._id));
  const likedCardsId = likedCardsOfCurrentUser.map(card => card._id);
  const cardProperty = likedCardsOfCurrentUser.map(singleCardProperty => {
    console.log(singleCardProperty);
    return singleCardProperty
  })
  useEffect(() => {
    getAllCards();
  }, [getAllCards]);

  useEffect(() => {
    try {
      setFavCards(likedCardsOfCurrentUser)
    } catch (err) {
      console.log("There is no liked cards");
    }
  }, [cards])


  return (
    <>
      <PageHeader
        title={"Favorite cards"}
        subtitle={"Welcome to favorite cards page"}
      />

      <div>
        {console.log("The ID's Of Liked Cards:", likedCardsId)}
        {console.log("The Liked Cards:", likedCardsOfCurrentUser)}
      </div>
      <div>
        <CardsFeedback
          cards={favCards}
          isLoading={isLoading}
          error={error}
          handleDelete={handleDelete}
          handleLike={handleLike}
        />
      </div>
    </>
  );
}
