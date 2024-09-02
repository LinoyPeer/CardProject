import { useCallback, useState } from "react";
import { useSnack } from "../../providers/SnackbarProvider";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

export default function useCards() {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const setSnack = useSnack();

  useAxios();

  const getAllCards = useCallback(async () => {
    try {
      let response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
      );
      setCards(response.data);
      setSnack("success", "All cards are here!");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const getMyCards = useCallback(async () => {
    try {
      let response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards"
      );
      setCards(response.data);
      setSnack("success", "All my cards are here!");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const getCardById = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
      );
      const data = response.data;
      setCard(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const handleDelete = useCallback(async (id) => {
    confirm('ARE YOU SURE YOU WANT TO DELETE THIS CARD?')
    try {
      const response = await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
      const deletedCard = response.data;
      setCard(deletedCard);
      alert('THE CARD HAS DELETED');
      console.log("Card " + id + " deleted");
      setCards(prev => prev.map(cardToCheck => {
        if (cardToCheck._id !== id) { return cardToCheck }
        return deletedCard;
      }));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    getMyCards();
  }, []);

  const handleLike = useCallback(async (id) => {
    try {
      const response = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
      );
      const newCard = response.data;
      setCard(newCard);
      setCards(prev => prev.map(cardToCheck => {
        if (cardToCheck._id !== id) { return cardToCheck }
        return newCard;
      }));

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return {
    cards,
    card,
    error,
    setError,
    setIsLoading,
    isLoading,
    getAllCards,
    getCardById,
    handleDelete,
    handleLike,
    getMyCards,
  };
}
