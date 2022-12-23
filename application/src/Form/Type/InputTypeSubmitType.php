<?php

namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class InputTypeSubmitType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        // We use the options['label'] to set the value of the submit-button
        if ($options['label']) {
            $value = $options['label'];
            // Set the label to false, because we do not want to show any label. But we must do it in $view->vars too,
            // because it has been set in BaseType from the $options
            $options['label'] = false;
        } else {
            $value = $form->getBlockPrefix();
        }
        // label is set to false (see above) so the label isn't shown
        $view->vars = array_replace($view->vars, array('type' => 'submit', 'value' => $value, 'label' => false));
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array('mapped' => false, 'label' => false, 'required' => false, 'compound' => false));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix(): string
    {
        return 'input_type_submit';
    }
}